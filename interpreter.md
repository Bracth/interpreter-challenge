# Welcome to my int interpreter

Thank you very much first of all for taking the trouble to review my code. I had a somewhat complicated week on a personal level but still I gave my 110% I appreciate any feedback you can give me, well without more to add let's start.

#  Init and use

Init the app is very simple, you only need to clone the github repository and npm install

For testing the command is npm test

With npm run dev you can run the index.js there I did a simple execution of interpreter interpreter([3, 0, 4, 0, 99]) this ask for a number and print it. You can modify this index to test anything you like.

## Reducer

A pattern that I have learned to appreciate is the use of reducer, I am used to it and I particularly like it, I decided to use something similar to perform the actions of my interpreter although it has nothing to do with react xD.

 I think it is easy to debug and it is also easy to extend by adding new actions,  I must admit  that it gave me a little trouble to introduce the opcode 3 and 4, since those "actions" depend on one parameter and the previous ones depend on three parameters. The positive side is that with a simple modification now my interpreter could receive another type of actions with for example 5 parameters or those that are necessary without affecting anything. 

## Improvements

I know my code is not perfect and that excites me because I know I can continue to improve a lot, something that did not convince me much of my code is the way I handle errors, I think the interpreter can receive very complex instructions and some could cause unexpected failures, especially in opcode 3 where the user can write whatever he wants and in this case I am being very permissive. 

Also I take this opportunity to comment that I'm not sure how to test the user input, I didn't want to install any library so I opted for readline and the truth was my first time using it, it also shows by console some weird things like duplicate the number that I write.


