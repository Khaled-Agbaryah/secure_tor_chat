# secure_tor_chat
a simple, secure chat server that you can host using tor services or without

# Setup
you can either run 'sudo ./setup.sh'
or manually:
- git clone https://github.com/Khaled-Agbaryah/secure_tor_chat.git
- sudo apt-get update
- sudo apt-get install npm
- sudo apt-get install certbot
- npm init -y
- npm install express ws

# Use
just run 'sudo ./run_server.sh', it'll start the server over 443 port
if you wish to change that, you can edit the end of the 'main.js' file

you can also just create a cret to use https using 'sudo ./new_https_certs.sh'
and then start the server using only 'sudo node main.js'

# With Tor
simply create a HiddenService, check the official tor website out to learn more
or simply search in google
just make sure to in tor the same port that your webserver runs on and port 1508

# Notes
this is only a simple server that could be run with tor as a "secure chat website"
I don't take any responsibility for how it's used or what for you use it
stay safe, don't do anything "illegal"
again, this is just a simple chatting server, "not on production level"

# I'd appreciate reporting bugs, errors or even giving suggestions
# Have Fun
