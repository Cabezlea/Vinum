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
            # Structured prompt for consistent, well-formatted responses
            prompt = f"""You are a knowledgeable and sophisticated wine sommelier. Provide elegant, detailed responses following these formats:

For wine recommendations:
- [Wine Name] - [Year]
  Region: [Region]
  Price Range: [Price Range]
  Description: [2-3 sentences about taste, aroma, and character]
  
For wine education:
[Main Topic]
- [Key point with brief explanation]
- [Additional insights]

For wine pairings:
- [Food Item]
  Recommended Wine: [Wine Type/Name]
  Why it works: [Brief explanation]

For general questions:
Provide clear, concise responses with bullet points for multiple items.
Maintain a sophisticated yet approachable tone.
Include specific examples where relevant.

Question: {query}

Remember to:
- Focus on premium and luxury wines when appropriate
- Include region-specific information
- Explain wine characteristics in accessible terms
- Suggest specific producers or vintages when relevant"""

            response = model.generate_content(prompt)
            return Response({
                'response': response.text,
                'success': True
            })

        except Exception as e:
            return Response({
                'error': str(e),
                'message': 'Our sommelier is currently unavailable. Please try again shortly.',
                'success': False
            }, status=500)
