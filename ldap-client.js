var ldap = require( 'ldapjs' );

var client = ldap.createClient({
	url: 'ldap://127.0.0.1:1389'
});

var entry = {
  cn: 'foo',
  sn: 'bar',
  email: ['foo@bar.com', 'foo1@bar.com'],
  objectclass: 'fooPerson'
};

var opts = {
  filter: '(&(l=Seattle)(email=*@foo.com))',
  scope: 'sub'
};

client.bind( 'cn=foo, o=example', 'secret', function( err ) {
	if( err ){
		console.log( 'bind error: ', err );
	}
});

client.add( 'cn=foo, o=example', entry, function( err ) {
	if( err ){
		console.log( 'add client error', err );
	}

	client.search( 'o=example', opts, function( searchErr, res ) {
		res.on( 'searchEntry', function( entry ) {
			console.log( 'entry: ' + JSON.stringify(entry.object) );
		});
	});
});