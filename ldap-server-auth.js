var ldap = require( 'ldapjs' ),
    mysql = require('mysql'),
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'database',
    }),
    tablename: 'users',
    server = ldap.createServer();

function authenticate( email, pass, cb ){
    connection.connect();
    var found = false;

    connection.query( 'select * from ' + tablename, function( err, rows, fields ) {
        if ( err ) throw err;

        for( var i = 0; i < rows.length; i++ ){
            if( rows[ i ].email == email && rows[ i ].pass == pass ){
                found = true;
                cb( { id: rows[ i ].id } );
            }
        }

        if( !found ){
             cb( { error: new ldap.InvalidCredentialsError() } );
        }
    });

    connection.end();
}

server.listen( 1389, function() {
    console.log( 'server up at: %s', server.url );

    server.bind( 'cn=gabriel_7340@hotmail.com', function( req, res, next ) {

        var user = req.dn.toString().replace( 'cn=', '' ),
            pass = req.credentials;
           
        authenticate( user, pass, function( login ){
            if( login.id ){
                res.end();
            } else {
                return next( login.error );
            }
          
        });

    });
});
