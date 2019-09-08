# Facebook But It's Good

![BIG Logo](icons/icon-96.png)

Hi, user! Carmi here. This page is a guide to the Facebook BIG web extension I made. It covers topics like [why I made this](#overview), [how to set it up](#setup), [what it does](#features), and [how much of your Facebook data I collect](#privacy) (spoiler: the answer is none).

# Setup
#### Firefox
1. Download [adblocker-1.0-an+fx.xpi]().
2. Go to [about:addons](about:addons).
3. Click the gear symbol > Install Add-on From File...
4. Select the file adblocker-1.0-an+fx.xpi.
#### Chrome
1. Download this repository as a .zip file.
2. Extract the contents to a folder.
3. Go to [chrome://extensions](chrome://extensions).
4. Enable Developer mode by ticking the checkbox in the upper-right corner.
5. Click on the "Load unpacked extension..." button.
6. Select the folder from Step 2.
#### Safari
1. No clue. Maybe it works the same way as Chrome? Never tried it.

# Overview
#### Purpose
I get a lot of junk in my Facebook news feed, but I still end up spending more time on Facebook than I do looking at content I actually care about. The goal of this extension is to replace trash posts with useful posts -- for example, swapping out Facebook ads for Duolingo quizzes, or memes for news headlines.

# Features
#### Content Blocking
The main feature of this extension is hiding posts you don't want to see. You can filter out posts by the text in their titles and subtitles. For example:

  - If you want to stop seeing ads, you can filter by the phrases "Sponsored" and "Suggested for You" (these are filtered by default).
  - If you want to stop seeing which friends are replying to comments by other friends, you can filter by the phrase "replied to a comment".
  - If you want to stop seeing which events your friends are interested in, you can filter by the phrase "is interested".

You get the idea.

Filters are written as [Regular Expressions](https://regexone.com/), separated by line breaks. If you're new to regular expressions and just want to use the extension, try using the letters `.*` to mean "any text." So for example:

 - If you want to block both *John Doe replied to a comment* and *Jane Doe replied to a comment*, use the filter `.* replied to a comment`.
 - Other useful filters include:
   - `.* interested.*`
   - `.* commented.`
   - `.* shared a memory.`

If you have any questions on how to use this feature, please feel free to message me.

#### Duolingo
You can insert Duolingo quizzes into your Facebook feed. To do this, check the "Review Duolingo with me" box and enter your Duolingo username and password. The extension will then regularly show you sentences from your unfinished Duolingo sections.

##### News Headlines
You can insert news headlines into your news feed by checking the "Show my NYT articles" box.

#### Daily Poem and Vocab
These features aren't yet implemented. More soon.

# Privacy
I don't collect your personal data. I don't want to. Heck, I don't know how to.
All your Facebook content stays within your browser. The only thing this extension does is change how your browser displays it.

**However**, I do need to send your Duolingo data to a server to get your current quizzes. If you don't want me to be able to figure out how much French you know, don't check the Duolingo box. I don't store your Duolingo password, and the code for fetching Duolingo quizzes is all included in this repository, under "DuoProxy".

For more details on what I do with your Duolingo data, see the README there.

# Contact
If you have questions about how to use this or whether it's safe, please let me know. I'm also very interested in hearing your thoughts on how to make this better.