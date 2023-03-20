import inflection

def to_camel_case(data):
    camelcased_data = {}
    for key, value in data.items():
        if isinstance(key, str):
            camelcase_key = inflection.camelize(key, False)
            camelcased_data[camelcase_key] = value
        else:
            camelcased_data[key] = value
    return camelcased_data