import inflection
from django.db.models import F
from django.db.models import Case, When, BooleanField

def to_camel_case(data):
    camelcased_data = {}
    for key, value in data.items():
        if isinstance(key, str):
            camelcase_key = inflection.camelize(key, False)
            camelcased_data[camelcase_key] = value
        else:
            camelcased_data[key] = value
    return camelcased_data


def annotate_apps(apps):
    apps = apps.annotate(
        roleMemUrl=F("role_mem_url"), 
        isPublished=F("is_published"), 
        creatorEmail=F("creator_id__email")
    )
    return apps


def annotate_datasources(datasources):
    datasources = datasources.annotate(
        spreadsheetUrl=F("spreadsheet_url"),
        sheetName=F("gid")
    )
    return datasources


def annotate_datasource_columns(columns):
    columns = columns.annotate(
        initialValue=F("initial_value"),
        isLabel=F("is_link_text"),
        isRef=F("is_table_ref"),
        type=F("value_type"),
        isFilter=F("is_filter"),
        isUserFilter=F("is_user_filter"),
        isEditFilter=F("is_edit_filter")
    )
    return columns


def annotate_table_views(table_views):
    table_views = table_views.annotate(
        canView=F("can_view"),
        canAdd=F("can_add"),
        canDelete=F("can_delete")
    )
    return table_views


def annotate_table_view_viewable_columns(columns, table_view_id):
    columns = columns.annotate(
        initialValue=F("initial_value"),
        isLabel=F("is_link_text"),
        isRef=F("is_table_ref"),
        type=F("value_type"), 
        isFilter=F("is_filter"),
        isUserFilter=F("is_user_filter"),
        isEditFilter=F("is_edit_filter"),
        viewable=Case(
            When(
                tableviewviewablecolumn__table_view_id=table_view_id,
                tableviewviewablecolumn__datasource_column_id=F("id"),
                then=True
            ),
            default=False,
            output_field=BooleanField(),
        )
    )
    return columns


def annotate_detail_views(detail_views):
    detail_views = detail_views.annotate(
        canView=F("can_view"),
        canEdit=F("can_edit")
    )