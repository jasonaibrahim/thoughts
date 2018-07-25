# Thoughts
Log notes, thoughts, or other arbitrary text into timestamped files from the command line.

## Commands

Create a new thought
```bash
$ thought new
```

Create and open a Thought quickly
```bash
$ thought new | vi
$ thought new | code
$ thought new | nano
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

Set Config
```bash
thoughts config --foo=bar
```

To set the default text editor that opens when you call `thought new`:

```bash
thoughts config --editor code
```