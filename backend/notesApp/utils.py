from rest_framework.response import Response
from .serializers import NotesSerializer
from .models import Notes


def getAllNotes(request):
    notes = Notes.objects.all().order_by('-updated')
    serializer = NotesSerializer(notes, many=True)
    return Response(serializer.data)


def createNote(request):
    data = request.data
    note = Notes.objects.create(
        title=data['title'],
        body=data['body'],
    )
    serializer = NotesSerializer(note, many=False)
    return Response(serializer.data)


def getNoteInfo(request, id):
    note = Notes.objects.get(id=id)
    serializer = NotesSerializer(note, many=False)
    return Response(serializer.data)


def deleteNote(request, id):
    note = Notes.objects.get(id=id)
    note.delete()
    return Response('Note was deleted')


def updateNote(request, id):
    data = request.data
    note = Notes.objects.get(id=id)
    serializer = NotesSerializer(instance=note, data=data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)
