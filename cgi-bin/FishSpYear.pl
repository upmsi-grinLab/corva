#!/usr/bin/perl
use CGI;
use DBI;
use JSON;
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
my $type=$cgi->param('type');

$type = "mangrove" if($type eq "");

my $sth;
$sth = $dbh->prepare(qq{select distinct(survey_date) from fish_sp
	where loc_id = ? order by survey_date desc;});
$sth->execute("$loc_id") or die $dbh->errstr;

my @a;
while(my $res=$sth->fetchrow_array){
	push @a,$res;
}
push @a, -9999 if(@a==0);
my $json_text= to_json \@a,{pretty=>1};
print $json_text;


exit 0;


