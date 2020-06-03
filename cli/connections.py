import typer

from typing import List
app = typer.Typer()

@app.command()


def start():
  user = input("i need to verify your identity, please enter your name")
  typer.echo(f"Welcome {user}!select the command you want to do by typing python connections.py commandname")
  
@app.command()
def add(add:str):
    
    typer.echo(f"taking you to add {add} connection now!")


@app.command()
def view(view:str):
  typer.echo("taking you to view that connection now")


if __name__ == '__main__':
   # typer.run(start)
    app()

