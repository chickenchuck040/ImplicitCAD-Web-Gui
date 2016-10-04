#!/bin/sh

HOME='/home/ubuntu'
PATH='/home/ubuntu/.nvm/versions/node/v4.5.0/bin:/home/ubuntu/.cabal/bin:/opt/cabal/1.22/bin:/opt/ghc/7.10.3/bin:/usr/local/rvm/gems/ruby-2.3.0/bin:/usr/local/rvm/gems/ruby-2.3.0@global/bin:/usr/local/rvm/rubies/ruby-2.3.0/bin:/mnt/shared/bin:/home/ubuntu/workspace/node_modules/.bin:/home/ubuntu/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/mnt/shared/sbin:/opt/gitl:/opt/go/bin:/mnt/shared/c9/app.nw/bin:/usr/local/rvm/bin'

echo "Compiling..."
ghc $1/model.hs

echo "Running..."

cd $1
mkdir output
cd output
../model

echo "Done!"