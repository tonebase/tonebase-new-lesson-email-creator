# The tonebase Digest Creator - 2019

### What is it?

A quick way to create the Piano digest for weekly sending to the Piano subscribers. Eventually we will want to move the Guitar Digest to this format too as it is a little more extensible! This is a way easier and more extensible version than the app we used before and can easily be used to go between instruments.

### How to use?

Follow the following directions:

```
1. Clone this repo. => git clone https://github.com/tonebase/tonebase-Digest-Creator
2. Make edits to GuitarData.json or PianoDigest.json as needed
3. Navigate to the folder containing the index.html file in Terminal (lot of cd'ing, etc.)
4. Start a local server with the following script: start8000
5. Navigate to http://localhost:8000/guitar.html or http://localhost:8000/piano.html (respectively)
6. You will see a preview of the newsletter/digest
7. Wait 4-5 seconds - a new tab will open with the HTML data
8. Make edits to the DigestData.json and keep refreshing the page to see the preview + get HTML
```

This will do everything for you in terms of preview + generating HTML. Scheduling, batching and sending is another animal and we have other guides (or will have other guides) for that!

### How to add to this repo ###

When you make changes on your local machine to this repo, always push an update back so you have the most up to date version. In order to push to this repo. please enter the following commands:

```
1. git add .
2. git commit -m "ENTER A VERY SHORT MESSAGE ABOUT YOUR CHANGES"
3. git push origin master
```

This will push code to the 'master' branch of github. 

If you see a failure please talk to Abhi (abhi@tonebase.co) and he will help you. Most often the failure is caused by you not having the same data as the repo. You can fix this by doing the following:

```
1. git pull origin master
```

If that causes more errors, reach out to Abhi immediately! Thanks!

### Questions, comments concerns?

Reach out at abhi@tonebase.co

### Credits

Heavily based off of Chris Kellers script here, all credits to him: https://gist.github.com/chrislkeller/3230081
