var ldap = require( 'ldapjs' ),
    server = ldap.createServer();

var validUser = {
    name: 'foo',
    pwd: 'secret',
};

server.listen( 1389, function() {
    console.log( 'server up at: %s', server.url );

    server.bind( 'cn=foo', function( req, res, next ) {
        var user = req.dn.toString().replace( 'cn=', '' ),
        pass = req.credentials;

        if( validUser.name != user || validUser.pwd != pass ) {
          return next(new ldap.InvalidCredentialsError());
        }

        res.end();
        return next( 'valid' );
    });
});
