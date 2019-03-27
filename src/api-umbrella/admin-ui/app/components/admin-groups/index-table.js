import Component from '@ember/component';
import DataTablesHelpers from 'api-umbrella-admin-ui/utils/data-tables-helpers';
import escape from 'lodash-es/escape';

export default Component.extend({
  didInsertElement() {
    this.$().find('table').DataTable({
      serverSide: true,
      ajax: '/api-umbrella/v1/admin_groups.json',
      pageLength: 50,
      order: [[0, 'asc']],
      columns: [
        {
          data: 'name',
          title: 'Name',
          defaultContent: '-',
          render: (name, type, data) => {
            if(type === 'display' && name && name !== '-') {
              let link = '#/admin_groups/' + data.id + '/edit';
              return '<a href="' + link + '">' + escape(name) + '</a>';
            }

            return name;
          },
        },
        {
          data: 'api_scopes',
          title: 'API Scopes',
          defaultContent: '-',
          orderable: false,
          render: DataTablesHelpers.renderLinkedListEscaped({
            editLink: '#/api_scopes/',
            nameField: 'name',
          }),
        },
        {
          data: 'permission_display_names',
          title: 'Access',
          defaultContent: '-',
          orderable: false,
          render: DataTablesHelpers.renderListEscaped,
        },
        {
          data: 'admins',
          title: 'Admins',
          defaultContent: '-',
          orderable: false,
          render: DataTablesHelpers.renderLinkedListEscaped({
            editLink: '#/admins/',
            nameField: 'username',
          }),
        },
      ],
    });
  },
});
