How I Built A Lo-fi Hip-Hop Music Generator
===========================================

Using LSTMs and Recurrent Neural Networks
-----------------------------------------

[![Zakari](https://miro.medium.com/fit/c/96/96/1*_Cf457DXRBnEFRJKdMGRJg.jpeg)](https://medium.com/@z77.v303?source=post_page-----e24a005d0144--------------------------------)[Zakari](https://medium.com/@z77.v303?source=post_page-----e24a005d0144--------------------------------)Follow[Nov 17, 2020](https://medium.com/ai-in-plain-english/building-a-lo-fi-hip-hop-generator-e24a005d0144?source=post_page-----e24a005d0144--------------------------------) · 6 min read

Lo-fi Hip Hop refers to a subliminal genre of music that fuses traditional hip-hop and jazz elements to create an atmospheric, soothing, instrumental soundscape. It is characterized by the high-utilization of elements such as introspection, mellow tunes, and Japanese anime.

Pioneers such as [Nujabes](https://en.wikipedia.org/wiki/Nujabes) and [J Dilla](https://en.wikipedia.org/wiki/J_Dilla) have been referred to as the “godfathers of Lo-Fi Hip Hop”. Now, the music is being produced and moved forward through a vast assortment of musical artists such as eevee, tomppabeats, jinsang, and many others.

24/7 lo-fi hip-hop livestreams on YouTube have won the hearts and minds of millions of listeners, such as myself. If you search “lofi hip hop livestream” on YouTube right now, you’ll find lots of different live broadcasts. Popular channels such as ChilledCow attract as many as 50,000 concurrent viewers or more at any given time. It also has a significant presence on Spotify, with playlists like Lo-Fi Beats commanding millions of followers.

<img alt="Image for post" class="t u v if aj" src="https://miro.medium.com/max/1280/0\*YyL79g0pgvpMnzta" width="640" height="360" srcSet="https://miro.medium.com/max/552/0\*YyL79g0pgvpMnzta 276w, https://miro.medium.com/max/1104/0\*YyL79g0pgvpMnzta 552w, https://miro.medium.com/max/1280/0\*YyL79g0pgvpMnzta 640w" sizes="640px"/>

lo-fi hip hop girl — now an internet meme

For these reasons, I’ve ventured to create a Neural Network that could automatically generate new lo-fi hip hop tracks. I have also linked a github repo at the end of the article if you are interested in experimenting with the underlying code.

Also, check back for **PART 2**, where we will be experimenting with Convolutional Neural Networks and GANS to fully generate the entirety of a lo-fi track.

Without further ado, lets get started!

<img alt="Image for post" class="t u v if aj" src="https://miro.medium.com/max/1000/0\*-j3c5aZd8nAwu3lQ.gif" width="500" height="375" srcSet="https://miro.medium.com/max/552/0\*-j3c5aZd8nAwu3lQ.gif 276w, https://miro.medium.com/max/1000/0\*-j3c5aZd8nAwu3lQ.gif 500w" sizes="500px"/>

The Dataset
-----------

As we have explained, Lo-Fi Hip Hop is characterized by distinctive and mellow jazz-like beats. For example, here is an mp3 file containing the loop to Nujabes — Feather:

..and here is the corresponding MIDI file I then proceeded to loop myself:

[

merge\_from\_ofoct.mid (#1705128)
---------------------------------

### OnlineSequencer.net is an online music sequencer. Make tunes in your browser and share them with friends!

#### onlinesequencer.net

](https://onlinesequencer.net/1705128)

A MIDI file is essentially a very compact way of representing a sequence of notes being used on different instruments. MIDI carries event messages that specify the instructions for music, i.e., “note on”, “note off”, octave, velocity, and pitch.

Using Music21 (a toolkit for extracting data from MIDI files), we then convert them into “NoteSequences”, a fast and efficient data format that’s easier to work with for training. Once we have extracted all relevant information, we can then apply other audio processing techniques on it to produce music.

The main advantage of using MIDI files is that the computation needed is _drastically_ less. For instance, raw audio has an average of 44100 time steps a second, nearly 10,000X more than a MIDI file. The trade-off is that we are unable to fully encapsulate the entirety of all the musical instruments and beat in the track (To see how we might solve this, check **PART 2**).

> **_9 times out of 10, your dataset is the bottleneck for higher performance on neural networks._**

When building your dataset, you have to be willing to scour the web for hours searching for pieces that truly encapsulate what your trying to model (or even creating them yourself). This is to ensure that the model has enough relevant information and variety to correctly predict the resulting notes. Thus, many of the MIDI files were sampled from recurring notes and chords found in slow jazz and hip-hop that are prevalent in lofi hip-hop tracks.

Noteworthy mentions go to [Cymatics](https://cymatics.fm/blogs/production/free-lofi-samples) for their free Lofi-Hip Hop MIDI files and samples that I used in the dataset. Other MIDI files were found through various reddit threads and google searches.

The Model
---------

Recurrent neural networks (**RNNs**) are a class of artificial neural networks that make use of sequential information present in the data. Our model is an **LSTM** (stands for **long short-term memory**); a special kind of RNN capable of learning long-term dependencies.

I will not be going too in-depth here as this article is mostly about the implementation. (For an in-depth understanding of LSTMs and neural networks I would highly recommend Andrew Ng’s deeplearning.ai course).

<img alt="Image for post" class="t u v if aj" src="https://miro.medium.com/max/4000/0\*iBa260pWPgaPVTof.jpg" width="2000" height="865" srcSet="https://miro.medium.com/max/552/0\*iBa260pWPgaPVTof.jpg 276w, https://miro.medium.com/max/1104/0\*iBa260pWPgaPVTof.jpg 552w, https://miro.medium.com/max/1280/0\*iBa260pWPgaPVTof.jpg 640w, https://miro.medium.com/max/1456/0\*iBa260pWPgaPVTof.jpg 728w, https://miro.medium.com/max/1632/0\*iBa260pWPgaPVTof.jpg 816w, https://miro.medium.com/max/1808/0\*iBa260pWPgaPVTof.jpg 904w, https://miro.medium.com/max/1984/0\*iBa260pWPgaPVTof.jpg 992w, https://miro.medium.com/max/2000/0\*iBa260pWPgaPVTof.jpg 1000w" sizes="1000px"/>

One to Many LSTM architecture

A recurrent neural network has looped, or recurrent, connections which allow the network to hold information across inputs. These connections can be thought of as memory cells. All RNNs have the form of a chain of repeating modules of a neural network. For the LSTM, each module has four distinct neural layers (or “gates”), that interact with each other in a particular way:

*   **Forget Gate Layer:** decides what information should be thrown away or kept.
*   **Input Gate:** decides which values will be updated by transforming the values.
*   **Cell State:** updates the state by transforming the values using point-wise calculation.
*   **Output Gate:** determines what the next hidden state should be.

The core concept to remember is that through these internal mechanisms, the LSTM learns what information is relevant to _keep_ or _forget_ during training. Let’s apply this to our problem: music generation.

Training
--------

<img alt="Image for post" class="t u v if aj" src="https://miro.medium.com/max/4000/0\*eHXP2eLrb7zP6agD.jpg" width="2000" height="691" srcSet="https://miro.medium.com/max/552/0\*eHXP2eLrb7zP6agD.jpg 276w, https://miro.medium.com/max/1104/0\*eHXP2eLrb7zP6agD.jpg 552w, https://miro.medium.com/max/1280/0\*eHXP2eLrb7zP6agD.jpg 640w, https://miro.medium.com/max/1456/0\*eHXP2eLrb7zP6agD.jpg 728w, https://miro.medium.com/max/1632/0\*eHXP2eLrb7zP6agD.jpg 816w, https://miro.medium.com/max/1808/0\*eHXP2eLrb7zP6agD.jpg 904w, https://miro.medium.com/max/1984/0\*eHXP2eLrb7zP6agD.jpg 992w, https://miro.medium.com/max/2000/0\*eHXP2eLrb7zP6agD.jpg 1000w" sizes="1000px"/>

Each input note in the music file is used to predict the next note in the file, i.e., each LSTM cell takes the previous layer activation (a⟨t−1⟩) and the previous layers output (y⟨t−1⟩) as input at the current time step tt. It thus learns the note and chord progressions of the input data, stores their relevant information, and then uses this at inference for predicting the next notes in the sequence.

Our model architecture is heavily based off of Sigurður Skúli‘s [excellent article for music generation](https://towardsdatascience.com/how-to-generate-music-using-a-lstm-neural-network-in-keras-68786834d4c5). I made a few adjustments such as changing the optimization to ADAM optimization and the batch size to 64 for faster convergence.

I started by pre-training the model on a small corpus of piano music for ~50 epochs, to allow the model to learn certain qualities of basic note and chord progression, which should [transfer](https://en.wikipedia.org/wiki/Transfer_learning) well into our specific problem. I then ran the model for 200 epochs on the selected dataset. I found the results generated prior to full convergence (at around the ~150th epoch) to sound better and more interesting, probably due to the just-right amount of variance.

Now, let us listen to what the model generated..

Generated Tracks
----------------

Here are the first 3 samples generated by the model (converted from MIDI to mp3):

My favourite parts are Lofi output 1 at 0:15–0:22. Lofi output 2 also sounds great from 0:13. Both contain a complex and clear rhythm that you could definitely imagine seeing within a lo-fi track. Overall, I was pleasantly surprised at how good some of the results sounded.

Now, we can apply some audio processing to create an entire lo-fi track. All we need to do is change the MIDI output to the [LABS soft piano VST](https://labs.spitfireaudio.com/soft-piano). I then added some background ambience (using rain), added a rolling drum beat, and … done! This was made on the Waveform Free DAW and was my first time ever doing any kind of audio processing.

This was only a demonstration of what someone could do with the results, I am sure that someone with much more experience at audio processing could leverage the power of this neural network to create much better sounding tracks.

You can find the full code in [this GitHub repository](https://github.com/Zzlatan/Lofi-Hip-Hop-Generator).

