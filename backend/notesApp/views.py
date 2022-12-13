from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Notes
from .serializers import NotesSerializer


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


@api_view(["GET"])
def getNotes(request):
    all_notes = Notes.objects.all()
    serializer = NotesSerializer(all_notes, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def getNote(request, _id):
    note = Notes.objects.get(id=_id)
    serializer = NotesSerializer(note, many=False)
    return Response(serializer.data)

@api_view(["POST"])
def updateNote(request, _id):
    note = Notes.objects.get(id=_id)
    