#!/usr/bin/perl
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

my $hostname = $cfg{hostname};
my $database = $cfg{database};
my $user = $cfg{user};
my $pass = $cfg{pass};

my $dbh = DBI->connect("dbi:mysql:database=$database;host=$hostname", $user,$pass,{AutoCommit => 1})
	or die "Failed to connect to database: $DBI::errstr";

my $cgi=CGI->new;
print $cgi->header('application/json; charset=UTF-8');

my $loc_id=$cgi->param('loc_id');
my $year=$cgi->param('year');

my $sth = $dbh->prepare(qq{select * from seagrass_density where loc_id = ? and survey_date= ?;});
$sth->execute("$loc_id","$year") or die $dbh->errstr;

my @a;
my %t;
my %c;
my %final;
my %finalna;
while(my $res=$sth->fetchrow_hashref){
	%t=%$res;
	foreach my $k (sort keys %t){
		$final{$k}=$t{$k};
	}
}

if(%t == 0){
	print "[-9999]";
	exit 0;
}

# DIY JSON encoder.
print"[{\n";
###################
print qq{
"species"  : "Enhalus acoroides",
"count"    : $final{E_acor},
"year"     : $year,
"color"    : "#FF0F00"
};
print "},{";
print qq{
"species"  : "Thalassia hemprichii",
"count"    : $final{T_hem},
"year"     : $year,
"color"    : "#FF6600"
};
print "},{";
print qq{
"species"  : "Cymodocea serrulata",
"count"    : $final{C_ser},
"year"     : $year,
"color"    : "#FF9E01"
};
print "},{";
print qq{
"species"  : "Cymodocea rotundata",
"count"    : $final{C_rot},
"year"     : $year,
"color"    : "#FCD202"
};
print "},{";
print qq{
"species"  : "Halodule uninervis",
"count"    : $final{H_uni},
"year"     : $year,
"color"    : "#F8FF01"
};
print "},{";
print qq{
"species"  : "Halodule pinifolia",
"count"    : $final{H_pini},
"year"     : $year,
"color"    : "#B0DE09"
};
print "},{";
print qq{
"species"  : "Halodule minor",
"count"    : $final{H_min},
"year"     : $year,
"color"    : "#04D215"
};
print "},{";
print qq{
"species"  : "Halodule decipiens",
"count"    : $final{H_deci},
"year"     : $year,
"color"    : "#0D8ECF"
};
print "},{";
print qq{
"species"  : "Halodule ovalis",
"count"    : $final{H_oval},
"year"     : $year,
"color"    : "#0D52D1"
};
print "},{";
print qq{
"species"  : "Halodule spinulosa",
"count"    : $final{H_spi},
"year"     : $year,
"color"    : "#2A0CD0"
};
print "},{";
print qq{
"species"  : "Syringodium isoetifolium",
"count"    : $final{S_iso},
"year"     : $year,
"color"    : "#210F6D"
};
print "},{";
print qq{
"species"  : "Halophila beccarii",
"count"    : $final{H_bec},
"year"     : $year,
"color"    : "#8A0CCF"
};
print "},{";
print qq{
"species"  : "Thalassodendron ciliatum",
"count"    : $final{T_cil},
"year"     : $year,
"color"    : "#8531E5"
};
print "},{";
print qq{
"species"  : "Halophila ovata",
"count"    : $final{H_ovat},
"year"     : $year,
"color"    : "#A26EEC"
};
print "},{";
print qq{
"species"  : "Halophila gaudichaudii",
"count"    : $final{H_gau},
"year"     : $year,
"color"    : "#880D54"
};
print "},{";
print qq{
"species"  : "Ruppia maritima",
"count"    : $final{R_mar},
"year"     : $year,
"color"    : "#6E0542"
};
###################
print"}]\n";

exit 0;


