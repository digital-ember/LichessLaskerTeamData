module Main exposing (..)

import Browser
import Data
import Html exposing (..)
import Html.Attributes as HtmlA
import Html.Events exposing (..)
import Http exposing (Error(..), Metadata)
import Json.Decode as JsonD exposing (Decoder, field)



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
    , blitzRating : Int
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
    List.map (\user -> JsonD.decodeString teamMemberDecoder user) userList
        |> List.map
            (\result ->
                case result of
                    Err _ ->
                        Nothing

                    Ok value ->
                        Just value
            )
        |> List.filterMap identity
        |> List.sortBy (\user -> user.blitzRating)
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
                    List.sortBy (\u -> u.blitzRating)

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
            text "Loading ..."

        Success ->
            div []
                [ div [] [ button [ onClick Load ] [ text "Reload" ] ]
                , div []
                    [ table []
                        (tr [ HtmlA.style "font-size" "20px"]
                            [ th [ HtmlA.style "vertical-align" "bottom" ]
                                [ div [ HtmlA.style "font-size" "14px" ] [ text <| "total: " ++ (String.fromInt <| List.length model.users) ]
                                , div [] [ text "Number" ]
                                ]
                            , th [ HtmlA.style "vertical-align" "bottom" ]
                                [ div [ HtmlA.style "font-size" "14px" ] [ text "" ]
                                , div []
                                    [ text "User name "
                                    , button [ onClick (Sort Asc 0) ] [ text "🡅" ]
                                    , button [ onClick (Sort Desc 0) ] [ text "🡇" ]
                                    ]
                                ]
                            , th [ HtmlA.style "vertical-align" "bottom" ]
                                [ div [ HtmlA.style "font-size" "14px" ] [ text <| "⌀: " ++ String.fromInt (userBlitzRatingAverage model.users) ]
                                , div []
                                    [ text "Blitz rating "
                                    , button [ HtmlA.style "font-weight" "bold", onClick (Sort Asc 1) ] [ text "🡅" ]
                                    , button [ onClick (Sort Desc 1) ] [ text "🡇" ]
                                    ]
                                ]
                            ]
                            :: List.indexedMap
                                (\i user ->
                                    tr []
                                        [ td [] [ text <| String.fromInt (i+1) ]
                                        , td [] [ text user.username ]
                                        , td [] [ text <| String.fromInt user.blitzRating ]
                                        ]
                                )
                                model.users
                        )
                    ]
                ]


userBlitzRatingAverage : List User -> Int
userBlitzRatingAverage users =
    List.foldl (\user sum -> sum + user.blitzRating) 0 users // List.length users



-- HTTP


teamUrl =
    "https://lichess.org/api/team/ksk-dr-lasker-1861-ev/users"



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
    JsonD.map2
        (\username rating ->
            { username = username
            , blitzRating = rating
            }
        )
        (field "username" JsonD.string)
        (field "perfs" (field "blitz" (field "rating" JsonD.int)))
