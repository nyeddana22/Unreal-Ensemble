# Unreal-Ensemble

Creating an API gateway to combine Comme Il Faut (CiF), a social interaction game framework with Unreal Engine.

# Steps to run the package

1. Install dependecies - `npm i`
2. Run the server - `npm start`

API Documentation -

POST - `/getActions`

Parameters - 
{
    initiator String The name of the character initiating the action
    responder String The name of the recipient of the action
    volition Object The registered volition object.
    cast Array The pool of characters to be used for consideration for the filling in of roles.
    numIntents Number The total number of different intents to pull actions from.
    numActionsPerIntent Number How many actions should come from each intent.
    numActionsPerGroup Number How many terminals should come from any given 'action group'
}

Returns:
A list of terminals, with roles bound with characters, that represent what the initiator most wants to do with the responder.

POST - `/loadSocialStructure`

Upload a file by passing the file in form-data body in the key `file`

POST - `/addCharacters`

Upload a file by passing the file in form-data body in the key `file`

POST - `/addRules`

Upload a file by passing the file in form-data body in the key `file`

POST - `/addActions`

Upload a file by passing the file in form-data body in the key `file`

POST - `/addHistory`

Upload a file by passing the file in form-data body in the key `file`

POST - `/doAction`

Given a bound action object, like those returned by ensemble.getAction(), performs the action by executing all of its effects.

Parameters
{
    boundAction Object
}

POST - `/runTriggerRules`

Apply rules that conditionally change social state

Parameters
{
    cast	Array	the array of cast members
}

Returns:
An object representing the changes made to the social state as a result of running these trigger rules.

POST - `/get`

Get a particular social state value

Parameters
{
    getPredicate Object
}

Returns:
matchedResults the array holding the found predicates which match the query

POST - `/calculateVolition`

Parameters
{
    cast	Array	an array of the cast of characters to calculate volition for
}

Returns:
calculatedVolitions a dictionary containing the cast and their volitions

POST - `/setupNextTimeStep`

Catches the SFDB's currentTimeStep to the timeStep specified.

Parameters
{
    timeStep	Number	the timeStep to catch up the SFDB to. If omitted, assumes the currentTimeStep + 1.
}

Returns:
The current timestep.