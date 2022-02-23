#!/usr/bin/perl
use CGI;
use DBI;
#use JSON;
use strict;
use warnings;

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

my $sth = $dbh->prepare(qq{select * from seagrass_cover where loc_id = ? and survey_date= ?;});
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
 	push @j,qq{\{"Type": "Enhalus acoroides","Count": $t{E_acor}\}};
 	push @j,qq{\{"Type": "Thalassia hemprichii","Count": $t{T_hem}\}};
 	push @j,qq{\{"Type": "Cymodocea serrulata", "Count": $t{C_ser}\}};
 	push @j,qq{\{"Type": "Cymodocea rotundata","Count": $t{C_rot}\}};
 	push @j,qq{\{"Type": "Halodule uninervis","Count": $t{H_uni}\}};
 	push @j,qq{\{"Type": "Halodule pinifolia","Count": $t{H_pini}\}};
 	push @j,qq{\{"Type": "Halophila minor","Count": $t{H_min}\}};
 	push @j,qq{\{"Type": "Halophila decipiens","Count": $t{H_deci}\}};
 	push @j,qq{\{"Type": "Halophila ovalis","Count": $t{H_oval}\}};
 	push @j,qq{\{"Type": "Halophila spinulosa","Count": $t{H_spi}\}};
 	push @j,qq{\{"Type": "Syringodium isoetifolium","Count": $t{S_iso}\}};
 	push @j,qq{\{"Type": "Halophila beccarii","Count": $t{H_bec}\}};
 	push @j,qq{\{"Type": "Thalassodendron ciliatum","Count": $t{T_cil}\}};
 	push @j,qq{\{"Type": "Halophila ovata","Count": $t{H_ovat}\}};
 	push @j,qq{\{"Type": "Halophila gaudichaudii","Count": $t{H_gau}\}};
 	push @j,qq{\{"Type": "Ruppia maritima","Count": $t{R_mar}\}};
	my $j=join(",",@j);
	print $j;
print"]\n";

exit 0;


