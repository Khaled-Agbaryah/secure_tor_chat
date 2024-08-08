openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.cert


# sudo certbot certonly --standalone -d mamamya_domain_doma_doom_this_is_useless_in_tor.com

# SSLEngine on
# SSLCertificateFile /etc/letsencrypt/live/mamamya_domain_doma_doom_this_is_useless_in_tor.com/fullchain.pem
# SSLCertificateKeyFile /etc/letsencrypt/live/mamamya_domain_doma_doom_this_is_useless_in_tor.com/privkey.pem
