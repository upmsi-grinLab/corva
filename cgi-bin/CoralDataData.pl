#!c:\xampp\perl\bin\perl.exe
use CGI;
use DBI;
#use JSON;
use strict;

my %cfg;
open(R,"corvaconfig.pl") || die "Can't open corvaconfig.pl";
while(my $in=<R>){
	chomp $in;
	chomp $in;
	study $in;
	if($in=~m/^#cfg /g){
		$in=~s/#cfg //g;
		my ($key,$val)=split(/ = /,$in);
		$val=~s/[\s;]//g;
		$cfg{$key}=$val;
	}
}

my $hostname = 'localhost';
my $database = 'corva';
my $user = 'root';
my $pass = 'admin';

# my $hostname = $cfg{hostname};
# my $database = $cfg{database};
# my $user = $cfg{user};
# my $pass = $cfg{pass};

my $dbh = DBI->connect("dbi:mysql:database=$database;host=$hostname", $user,$pass,{AutoCommit => 1})
	or die "Failed to connect to database: $DBI::errstr";

my $cgi=CGI->new;
print $cgi->header('application/json; charset=UTF-8');

my $loc_id=$cgi->param('loc_id');
my $year=$cgi->param('year');

my $sth = $dbh->prepare(qq{select * from coral_shallow where loc_id = ? and monitor_year= ?;});
$sth->execute("$loc_id","$year") or die $dbh->errstr;

my $res=$sth->fetchrow_hashref;
if(! $res){
	#print qq{[\{\}]};
	print qq{[]};
	#print qq{Hello world!!\n};
	exit 0;
}

my %t = %$res;

# DIY JSON encoder.
print"[";
	my @j;
 	push @j,qq{\{"Type": "Hard Coral","Count": $t{HC_cover}\}};
 	push @j,qq{\{"Type": "Algal Assemblage","Count": $t{AA_cover}\}};
 	push @j,qq{\{"Type": "Abiotic","Count": $t{AB_cover}\}};
 	push @j,qq{\{"Type": "Macroalgae","Count": $t{MA_cover}\}};
 	push @j,qq{\{"Type": "Halimeda","Count": $t{HA_cover}\}};
 	push @j,qq{\{"Type": "Other Biota","Count": $t{OB_cover}\}};
	my $j=join(",",@j);
	print $j;
print"]\n";

exit 0;


