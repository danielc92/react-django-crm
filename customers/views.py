from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import Customer
from .serializers import CustomerSerializer


@api_view(['GET', 'POST'])
def customers_list(request):
    """
    Create or view list of paginated customers.
    """

    if request.method == 'GET':
        
        data = []
        nPage = 1
        pPage = 1
        customers = Customer.objects.all()
        page = request.GET.get('page',1)
        paginator = Paginator(customers, 8)

        try: 
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = CustomerSerializer(data, 
                                        context={'request': request}, 
                                        many=True)

        if data.has_next():
            nPage = data.next_page_number()
        
        if data.has_previous():
            pPage = data.previous_page_number()

        return Response({'data': serializer.data , 
                         'count': paginator.count, 
                         'numpages' : paginator.num_pages, 
                         'nextlink': '/api/customers/?page={}'.format(nPage), 
                         'prevlink': '/api/customers/?page={}'.format(pPage)})

    elif request.method == 'POST':

        serializer = CustomerSerializer(data = request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def customers_detail(request, pk):
    """
    Customers can be viewed, deleted or modified given a customer id/pk
    """

    try:
        customer = Customer.objects.get(pk=pk)
    except Customer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CustomerSerializer(customer, context={'request': request})
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = CustomerSerializer(customer, 
                                        data=request.data, 
                                        context = {'request': request})

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        customer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)