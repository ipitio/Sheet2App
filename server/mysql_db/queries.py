from s2a_api.models import Creator


def create_creator(email):
    Creator.objects.create(email=email)
    
    
