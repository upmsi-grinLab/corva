#!/usr/bin/perl
use CGI;
use DBI;
#use JSON;
use strict;

cfg hostname = localhost;
cfg database = corva;
cfg user = root;
cfg pass = admin;

my $cgi=CGI->new;
print $cgi->header('application/json; charset=UTF-8');

# DIY JSON encoder.
print"[{\n";
print"}]\n";

exit 0;


