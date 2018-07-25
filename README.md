# Thoughts
Log notes, thoughts, or other arbitrary text into timestamped files from the command line.

## Commands

Create a new thought
```bash
$ thought new
```

Show your last thought
```bash
$ thought last
$ a9048243 Just waking up in the morning gotta thank God. I don't know but today seems kinda odd...
```

List your thoughts. By default the last 10 will be displayed
```bash
$ thought list 
$ a9048243 Just waking up in the morning gotta thank God. I don't know but today seems kinda odd...
$ ce44q343 I gotta go cause I got me a drop top...
```

List all of your thoughts
```bash
$ thought list --all
```

Open the thought folder in the system default text editor
```bash
$ thought open
```

Open a single thought in the system default text editor
```bash
$ thought open <id> # e.g. thought open a9048243
```