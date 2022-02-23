#!/usr/bin/perl
use strict;

while(my $in=<>){
	$in =~s/\r//gi;
	print $in;
}

exit 0;

