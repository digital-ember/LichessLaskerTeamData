module Main exposing (..)

import Browser
import Data
import Html exposing (..)
import Html.Attributes as HtmlA
import Html.Events as HtmlE exposing (..)
import Http exposing (Error(..), Metadata)
import Json.Decode as JsonD exposing (Decoder, field)
import Task
import Time exposing (toDay, toHour, toMinute, toMonth, toSecond, toYear, utc)



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
    { teamName : String
    , users : List User
    , fetchState : FetchState
    , timestamp : String
    }


type Msg
    = Load
    | Sort SortOrder Int
    | GotData (Result Error String)
    | Timestamp String
    | UpdateTeamName String


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
    ( { teamName = "ksk-dr-lasker-1861-ev", users = [], fetchState = Loading, timestamp = "" }, getTeamData "ksk-dr-lasker-1861-ev" )



-- UPDATE


type SortOrder
    = Asc
    | Desc


decodeUsers dataAsString =
    let
        userList =
            String.split "\n" dataAsString
    in
    List.map (\user -> JsonD.decodeString teamMemberDecoder user) userList
        |> List.map
            (\result ->
                case result of
                    Err rr ->
                        let
                            r =
                                Debug.log "error" rr
                        in
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
        UpdateTeamName name ->
            ( { model | teamName = name }, Cmd.none )

        Timestamp time ->
            ( { model | timestamp = time |> Debug.log "update time" }, Cmd.none )

        Load ->
            ( { model | fetchState = Loading }, getTeamData model.teamName )

        Sort sortOrder columnIndex ->
            ( { model | users = model.users |> sortBy sortOrder columnIndex }, Cmd.none )

        GotData result ->
            case result of
                Ok dataAsString ->
                    ( { model | users = decodeUsers dataAsString, fetchState = Success }, getTime )

                Err e ->
                    ( { model | fetchState = Failure e }, Cmd.none )


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
        [ h2 [] [ text "Lichess Team Data" ]
        , viewTeamData model
        ]


viewTeamData : Model -> Html Msg
viewTeamData model =
    case model.fetchState of
        Failure err ->
            div []
                [ text <| "Could not load data from " ++ teamUrl model.teamName
                , div []
                    [ text <| httpErrorAsString err
                    ]
                , div [] [ button [ onClick Load ] [ text "Reload" ] ]
                ]

        Loading ->
            text "Loading ..."

        Success ->
            div []
                [ div []
                    [ label [ HtmlA.for "teamInput"] [ text "Team: " ]
                    , input
                        [ HtmlA.type_ "text"
                        , HtmlA.value model.teamName
                        , HtmlE.onInput UpdateTeamName
                        , HtmlA.id "teamInput"
                        ]
                        []
                    , button
                        [ onClick Load ]
                        [ text "Reload" ]
                    ]
                , br [] []
                , div []
                    [ table []
                        ([ tr []
                            [ th [ HtmlA.colspan 3 ]
                                [ div [] [ text <| "Last update: " ++ model.timestamp ] ]
                            ]
                         , tr [ HtmlA.style "font-size" "20px" ]
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
                         ]
                            ++ List.indexedMap
                                (\i user ->
                                    tr []
                                        [ td [] [ text <| String.fromInt (i + 1) ]
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


teamUrl teamName =
    let
        teamNamePrepped =
            String.toLower teamName
            |> String.replace "'" ""
            |> String.replace " " "-"
    in

    "https://lichess.org/api/team/" ++ teamNamePrepped ++ "/users"


getTeamData : String -> Cmd Msg
getTeamData teamName =
    Http.get
        { url = teamUrl teamName
        , expect = Http.expectString GotData
        }


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


httpErrorAsString err =
    case err of
        NetworkError ->
            "Reason! \"Network error\" => Are you connected to the internet?"

        BadUrl string ->
            "Reason! \"Bad URL\" => Maybe the team you are trying to look up does not exist :("

        Timeout ->
            "Reason: \"Timeout\" => Try again later!"

        BadStatus int ->
            if int == 404 then
                "Reason! A dreaded \"404\"! => Maybe lichess.org is down, or the team you are trying to look up does not exist :("

            else
                "Reason! \"Bad status\" (" ++ String.fromInt int ++ ") => Check this status code or try later."

        BadBody string ->
            "Reason! \"Bad body\" (" ++ String.left 20 string ++ " ...) => Looks like I received data I cannot understand :("


getTime =
    Task.perform (\timestamp -> Timestamp timestamp) (Task.map2 timestampAsString Time.here Time.now)


timestampAsString : Time.Zone -> Time.Posix -> String
timestampAsString zone time =
    let
        toString i =
            (String.fromInt i |> (\s -> if String.length s == 1 then "0" ++ s else s))
    in

    String.fromInt (toDay zone time)
        ++ "."
        ++ monthAsNum (toMonth zone time)
        ++ "."
        ++ String.fromInt (toYear zone time)
        ++ " - "
        ++ (toString <| toHour zone time)
        ++ ":"
        ++ (toString <| toMinute zone time)
        ++ ":"
        ++ (toString <| toSecond zone time)
        |> Debug.log "timestamp"


monthAsNum month =
    case month of
        Time.Jan ->
            "01"

        Time.Feb ->
            "02"

        Time.Mar ->
            "03"

        Time.Apr ->
            "04"

        Time.May ->
            "05"

        Time.Jun ->
            "06"

        Time.Jul ->
            "07"

        Time.Aug ->
            "08"

        Time.Sep ->
            "09"

        Time.Oct ->
            "10"

        Time.Nov ->
            "11"

        Time.Dec ->
            "12"
