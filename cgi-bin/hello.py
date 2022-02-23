#!/usr/bin/env python

import cgitb
cgitb.enable()    
print("Content-Type: text/html")

print "Content-type:text/html\r\n\r\n"
print '<html>'
print '<head>'
print '<title>Hello Word - First CGI Program'
print '</head>'
print '<body>'
print '<h2>Hello Word! This is my first CGI program'
print '</body>'
print '</html>'
