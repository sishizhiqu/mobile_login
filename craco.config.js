const CracoLessPlugin = require('craco-less');
module.exports = {

    //AntD按需配置css
   /*  babel: {
        plugins: [['import', {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: true,
        }]],
    }, */


    //编译less文件，  可以更改主题色
    plugins: [
        {
          plugin: CracoLessPlugin,
          options: {
            lessLoaderOptions: {
              lessOptions: {
                modifyVars: { '@primary-color': 'pink' },
                javascriptEnabled: true,
              },
            },
          },
        },
      ],

      //rem适配
      style: {
        postcss: {
            mode: 'extends',
            loaderOptions: {
                postcssOptions: {
                    ident: 'postcss',
                    plugins: [
                        [
                            'postcss-pxtorem',
                            {
                                rootValue: 375/10, // 根元素字体大小
                                // propList: ['width', 'height']
                                propList: ['*']
                            },
                        ],
                    ],
                },
            },
        },
    },

  };