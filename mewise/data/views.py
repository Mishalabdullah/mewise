from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from .forms import DataForm
from .models import Quotes

@login_required
def data(request):
    user = request.user
    all_data = Quotes.objects.filter(user=user)
    return render(request, 'index.html', {'all_data': all_data})


@csrf_exempt
@login_required
def add(request):
    if request.method == 'POST':
        form = DataForm(user=request.user, data=request.POST)
        if form.is_valid():
            form.save()
            return redirect('data')  # Redirect to the appropriate page after adding data
    else:
        form = DataForm(user=request.user)
    return render(request, 'add.html', {'form': form})

