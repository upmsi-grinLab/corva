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

my $sth = $dbh->prepare(qq{select * from fish_bio where loc_id = ? and survey_date= ?;});
$sth->execute("$loc_id","$year") or die $dbh->errstr;

my @a;
my %t;
my %c;
my %mpa;
my %out;
while(my $res=$sth->fetchrow_hashref){
	%t=%$res;
	if(uc $t{type} eq "MPA"){
		foreach my $k (sort keys %t){
			$mpa{$k} = (-1) * $t{$k};
			#$mpa{$k} =  $t{$k};
		}
	}else{
		foreach my $k (sort keys %t){
			$out{$k}=$t{$k};
		}
	}
}

if(%t == 0){
	print "[-9999]";
	exit 0;
}

# DIY JSON encoder.
print"[{\n";

print qq{"type": "Benthic Invertivore",};
print qq{"mpa": $mpa{benthicInvertivore},};
print qq{"out": $out{benthicInvertivore}};
print "\n},{\n";

print qq{"type": "Corallivore",};
print qq{"mpa": $mpa{corallivore},};
print qq{"out": $out{corallivore}};
print "\n},{\n";

print qq{"type": "Detritivore",};
print qq{"mpa": $mpa{detritivore},};
print qq{"out": $out{detritivore}};
print "\n},{\n";

print qq{"type": "Herbivore",};
print qq{"mpa": $mpa{herbivore},};
print qq{"out": $out{herbivore}};
print "\n},{\n";

print qq{"type": "Omnivore",};
print qq{"mpa": $mpa{omnivore},};
print qq{"out": $out{omnivore}};
print "\n},{\n";

print qq{"type": "Piscivore",};
print qq{"mpa": $mpa{piscivore},};
print qq{"out": $out{piscivore}};
print "\n},{\n";

print qq{"type": "Planktivore",};
print qq{"mpa": $mpa{planktivore},};
print qq{"out": $out{planktivore}};
#print "\n},{\n";

print"\n}]\n";
exit 0;


