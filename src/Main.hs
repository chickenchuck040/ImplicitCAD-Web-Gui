{-# LANGUAGE OverloadedStrings #-}
module Main where

import           Prelude hiding (putStrLn,writeFile)
import           System.Directory
import           System.Process
import           Control.Applicative
import           Control.Monad.IO.Class
import           Control.Concurrent
import           Snap.Core
import           Snap.Util.FileServe
import           Snap.Http.Server
import           Data.String.Class
import           Data.GUID

main :: IO ()
main = quickHttpServe site

site :: Snap ()
site =
    ifTop (serveFile "assets/html/index.html") <|>
    route [ ("assets", serveDirectory "assets"),
        ("render", handleRender)
    ]

handleRender :: Snap ()
handleRender = do
    param <- readRequestBody 32768 -- Read POST body for a max of 32768 bytes
    modelId <- liftIO genText -- liftIO gives us access to the IO monad that genText needs
    tid <- liftIO (forkIO (render (fromText modelId) (fromLazyByteString param)))
    writeText modelId

newline :: String -> String
newline s = s ++ "\n"

modelDirPath :: String -> String
modelDirPath u = "assets/models/" ++ u

render :: String -> String -> IO ()
render id prog = do
    putStrLn ("Id: " ++ id)
    putStrLn ("Program: " ++ prog)
    
    createDirectory (modelDirPath id)
    writeFile ((modelDirPath id) ++ "/model.hs") (newline prog)
    
    exit <- system ("/bin/sh compile.sh " ++ (modelDirPath id))
    putStrLn (show exit)