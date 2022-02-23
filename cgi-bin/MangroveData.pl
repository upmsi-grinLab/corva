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

my $sth = $dbh->prepare(qq{select * from mangrove_data where loc_id = ? and survey_date= ?;});
$sth->execute("$loc_id","$year") or die $dbh->errstr;

my @a;
my %t;
my %c;
my %final;
my %finalna;
while(my $res=$sth->fetchrow_hashref){
	%t=%$res;
	foreach my $k (sort keys %t){
		my $d=substr($t{type},0,1);
		if($k=~m/[A-Z]_[a-z]{3}/){
			my $fkey="$k"."_"."$d";
			$final{$fkey}=$t{$k};
		}
		++$c{$k} if($t{$k}==0);
	}
}
foreach my $k (sort keys %final){
	my $ok=substr($k,0,5);
	$finalna{$k}=$final{$k} if($c{$ok}<3);
}

if(%t == 0){
	print "[-9999]";
	exit 0;
}

# DIY JSON encoder.
print"[{\n";
my $n=keys %finalna;
foreach my $k (sort keys %finalna){
	my $z=$k;
	$z=~s/_//g;
	--$n;
	my $m;
	if($n>0){
		$m=",";
	}else{
		$m="";
	}
	print qq{"$z": $finalna{$k}$m\n};
}
print"}]\n";

exit 0;