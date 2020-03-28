module Main exposing (..)

import Browser
import Html exposing (..)
import Html.Events exposing (..)
import Http exposing (Error(..), Metadata)
import Json.Decode exposing (Decoder, field)
import Task
import Data



-- MAIN


main =
    Browser.element
        { init = init
        , update = update
        , subscriptions = subscriptions
        , view = view
        }



-- MODEL


type alias Model =
    { users : List User
    , fetchState : FetchState
    }


type FetchState
    = Failure Error
    | Loading
    | Success


type alias User =
    { username : String
    , rating : Int
    }


init : () -> ( Model, Cmd Msg )
init _ =
    ( { users = decodeUsers, fetchState = Success }, Cmd.none )



-- UPDATE


type Msg
    = Load
    | Sort SortOrder Int
    | GotData (List (Result Error String))


type SortOrder
    = Asc
    | Desc


decodeUsers =
    let
        userList =
            String.split "\n" Data.usersData
    in
    List.map (\user -> Json.Decode.decodeString teamMemberDecoder user) userList
        |> List.map
            (\result ->
                case result of
                    Err _ ->
                        Nothing

                    Ok value ->
                        Just value
            )
        |> List.filterMap identity
        |> List.sortBy (\user -> user.rating)
        |> List.reverse


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Load ->
            ( { model | users = decodeUsers, fetchState = Success }, Cmd.none )

        Sort sortOrder columnIndex ->
            ( { model | users = model.users |> sortBy sortOrder columnIndex }, Cmd.none )

        GotData result ->
            -- for now, until APi is there
            ( { model | users = [], fetchState = Failure NetworkError }, Cmd.none )


sortBy : SortOrder -> Int -> List User -> List User
sortBy sortOrder index users =
    let
        sort =
            case index of
                0 ->
                    List.sortBy (\u -> u.username)

                1 ->
                    List.sortBy (\u -> u.rating)

                _ ->
                    List.sortBy (\u -> u.username)
    in
    case sortOrder of
        Asc ->
            sort users

        Desc ->
            sort users |> List.reverse



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none



-- VIEW


view : Model -> Html Msg
view model =
    div []
        [ h2 [] [ text "Lasker Team Data" ]
        , viewTeamData model
        ]


viewTeamData : Model -> Html Msg
viewTeamData model =
    case model.fetchState of
        Failure err ->
            div []
                [ text <| "Could not load data from " ++ teamUrl
                , div []
                    [ case err of
                        NetworkError ->
                            text <| "ERROR! network error "

                        _ ->
                            text <| "ERROR! other error"
                    ]
                , div [] [ button [ onClick Load ] [ text "Reload" ] ]
                ]

        Loading ->
            div []
                [ div [] [ button [ onClick Load ] [ text "Load" ] ]
                ]

        Success ->
            div []
                [ div [] [ button [ onClick Load ] [ text "Reload" ] ]
                , div []
                    [ table []
                        (tr []
                            [ th [] [ text "Number" ]
                            , th [] [ text "User name", button [ onClick (Sort Asc 0) ] [ text "↑" ], button [ onClick (Sort Desc 0) ] [ text "↓" ] ]
                            , th [] [ text "Blitz rating", button [ onClick (Sort Asc 1) ] [ text "↑" ], button [ onClick (Sort Desc 1) ] [ text "↓" ] ]
                            ]
                            :: List.indexedMap
                                (\i user ->
                                    tr []
                                        [ td [] [ text <| String.fromInt i ]
                                        , td [] [ text user.username ]
                                        , td [] [ text <| String.fromInt user.rating ]
                                        ]
                                )
                                model.users
                        )
                    ]
                ]



-- HTTP


teamUrl =
    "https://lichess.org/api/team/ksk-dr-lasker-1861-ev/users"


teamUrlLocal =
    "./users.json"



{-
   getTeamDataAsString : Cmd Msg
   getTeamDataAsString =
       Http.get
           { url = teamUrlLocal
           , expect = Http.expectString GotData --teamMemberDecoder
           }
-}


teamMemberDecoder : Decoder User
teamMemberDecoder =
    Json.Decode.map2
        (\username rating ->
            { username = username
            , rating = rating
            }
        )
        (field "username" Json.Decode.string)
        (field "perfs" (field "blitz" (field "rating" Json.Decode.int)))


