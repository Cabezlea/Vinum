from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
import google.generativeai as genai
from django.conf import settings

class WineSearchView(APIView):
    def post(self, request):
        genai.configure(api_key=settings.GEMINI_API_KEY)
        model = genai.GenerativeModel('gemini-pro')

        query = request.data.get('query', '')

        try:
            # We'll enhance this prompt later
            prompt = f"Act as a wine expert sommelier. Answer this wine-related question: {query}"
            response = model.generate_content(prompt)
            return Response({'response': response.text})
        except Exception as e:
            return Response({'error': str(e)}, status=500)
