var ldap = require( 'ldapjs' ),
    server = ldap.createServer();

server.listen( 1389, function() {

    console.log( 'server up at: %s', server.url );

    server.bind( 'cn=foo, o=example', function( req, res, next ) {

        server.add( 'cn=foo, o=example', function( req, res, next ) {

            console.log( 'DN: ' + req.dn.toString() );
            console.log( '\nEntry attributes:');
            var attrs = req.toObject().attributes;

            for( var ob in attrs )
                console.log( '\t' + ob + ':' + attrs[ ob ] );

            server.search( 'o=example', function( req, res, next ) {
                res.end();
            });

        });

    });
});
