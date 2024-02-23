from enum import Enum


class TokenKind(Enum):
    RefreshToken = "refresh_token"
    AccessToken = "access_token"


class TaskStatus(Enum):
    todo = "todo"
    in_progress = "in_progress"
    done = "done"
