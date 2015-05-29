var ldap = require( 'ldapjs' );

var client = ldap.createClient({
	url: 'ldap://127.0.0.1:1389'
});

client.bind( 'cn=gabriel_7340@hotmail.com', 'password', function( err, res ) {
	if( err ){
		console.log( 'bind error: ', err );
	} else {
		console.log( 'login ok' );
	}
});