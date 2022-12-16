from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .utils import getAllNotes, createNote, getNoteInfo, deleteNote, updateNote


@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            'Endpoint': '/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/notes/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },
    ]
    # setting safe allows us to send more than just a Dictionary
    return Response(routes)


@api_view(['GET', 'POST'])
def getNotes(request):
    if (request.method == 'GET'):
        return getAllNotes(request)

    if (request.method == 'POST'):
        return createNote(request)


@api_view(["GET", "PUT", "DELETE"])
def getNote(request, id):
    if (request.method == 'GET'):
        return getNoteInfo(request, id)

    elif (request.method == 'DELETE'):
        return deleteNote(request, id)

    elif (request.method == 'PUT'):
        return updateNote(request, id)
