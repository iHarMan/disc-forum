from django.contrib.auth.models import User
from django.db.models.query import QuerySet
from django.shortcuts import render
from rest_framework import response
from .models import Profile, Thread, Post, Topic
from .serializers import AccountSerializer, ThreadSerializer, PostSerializer, TopicSerializer
from rest_framework import serializers, status, mixins, generics
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
# Create your views here.

class CreateUserView(generics.ListCreateAPIView):
	queryset = User.objects.all()
	serializer_class = AccountSerializer

class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
	queryset = User.objects.all()
	serializer_class = AccountSerializer
	permission_classes = [IsAuthenticated]

class ThreadListCreateView(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
	queryset = Thread.objects.all()
	serializer_class = ThreadSerializer
	permission_classes = [IsAuthenticated]

	def get(self, request, *args, **kwargs):
		return self.list(request, *args, **kwargs)
	def post(self, request, *args, **kwargs):
		return self.create(request, *args, **kwargs)
	
class ThreadDetailView(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, generics.GenericAPIView):
	queryset = Thread.objects.all()
	serializer_class = ThreadSerializer
	permission_classes = [IsAuthenticated]

	def get(self, request, *args, **kwargs):
		return self.retrieve(request, *args, **kwargs)
	def put(self, request, *args, **kwargs):
		return self.update(request, *args, **kwargs)
	def delete(self, request, *args, **kwargs):
		return self.destroy(request, *args, **kwargs)

class PostListCreateView(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
	queryset = Post.objects.all()
	serializer_class = PostSerializer
	permission_classes = [IsAuthenticated]

	def get(self, request, *args, **kwargs):
		return self.list(request, *args, **kwargs)
	def post(self, request, *args, **kwargs):
		return self.create(request, *args, **kwargs)

class PostDetailView(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, generics.GenericAPIView):
	queryset = Post.objects.all()
	serializer_class = PostSerializer
	permission_classes = [IsAuthenticated]

	def get(self, request, *args, **kwargs):
		return self.retrieve(request, *args, **kwargs)
	def put(self, request, *args, **kwargs):
		return self.update(request, *args, **kwargs)
	def delete(self, request, *args, **kwargs):
		return self.destroy(request, *args, **kwargs)

class TopicListCreateView(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
	queryset = Topic.objects.all()
	serializer_class = TopicSerializer
	permission_classes = [AllowAny]

	def get(self, request, *args, **kwargs):
		return self.list(request, *args, **kwargs)
	def post(self, request, *args, **kwargs):
		return self.create(request, *args, **kwargs)

class TopicDetailView(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, generics.GenericAPIView):
	queryset = Topic.objects.all()
	serializer_class = TopicSerializer
	permission_classes = [IsAdminUser, IsAuthenticated]

	def get(self, request, *args, **kwargs):
		return self.retrieve(request, *args, **kwargs)
	def put(self, request, *args, **kwargs):
		return self.update(request, *args, **kwargs)
	def delete(self, request, *args, **kwargs):
		return self.destroy(request, *args, **kwargs)


class FeedView(generics.GenericAPIView):
	permission_classes = [AllowAny]
	def get(self, request, *args, **kwargs):
		topics = list(Topic.objects.all())
		domain = request.get_host()
		data = {}
		for topic in topics:				
			thread = Thread.objects.filter(topicID=topic.pk).order_by('-postedAt').first()
			if thread == None:
				data[topic.title] = 'NO THREADS'
			else:
				serializers = TopicSerializer()
				print(serializers)
				data[topic.title] = [thread.author.username, thread.postedAt, thread.upvotes, thread.title, thread.pk, "http://" + domain + "/media/{}".format(thread.media)]
				print(topic.media)
				data["topic_media"] = "http://" + domain + "/media/{}".format(topic.media)
		return Response(data, status=201)




