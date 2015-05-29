var ldap = require( 'ldapjs' );

var client = ldap.createClient({
	url: 'ldap://127.0.0.1:1389'
});

client.bind( 'cn=foo', 'secret', function( err ) {
	if( err ){
		console.log( 'bind error: ', err );
	}
});