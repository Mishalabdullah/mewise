from django import forms
from .models import Quotes

class DataForm(forms.ModelForm):
    def __init__(self, user=None, *args, **kwargs):
        super(DataForm, self).__init__(*args, **kwargs)
        self.user = user

    class Meta:
        model = Quotes
        fields = ['title', 'description']

    def save(self, commit=True):
        data = super(DataForm, self).save(commit=False)
        data.user = self.user  # Set the user to the current user
        if commit:
            data.save()
        return data
