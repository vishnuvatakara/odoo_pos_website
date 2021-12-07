{
    'name': 'ProductBrand',
    'category': 'POS',
    'sequence': -200,
    'summary': 'Setting Product Brand In POS',
    'description': "ProductBrand ON POS Orders",
    'installable': True,
    'application': True,
    'depends': ['product', 'point_of_sale','pos_discount'],
    'data': [
        'security/ir.model.access.csv',
        'views/product_template_inherited.xml',
        'views/assets.xml',
        'views/product_discount.xml',
    ],
    'qweb': ['static/src/xml/product_brand.xml',
             'static/src/xml/brand_receipt.xml',
             ],

}
