module.exports = {

  '/nginx/': [
    '',
    {
      title: 'nginx notebook',
      collapsable: true,
      children: [
        'docker-for-nginx'
      ]
    }
  ],
  '/crawler/': [
    '',
    {
      title: 'crawler notebook',
      collapsable: true,
      children: [
        'image-baidu-crawler',
      ]
    }
  ],
  '/hive/': [
    '',
    {
      title: 'hive sql',
      collapsable: true,
      children: [
        'list-map-sql-hive',
        'url-parse-sql-hive',
      ]
    },
  ]
}