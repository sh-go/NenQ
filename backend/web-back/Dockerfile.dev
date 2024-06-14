FROM python:3.11

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /code

COPY requirements.txt ./
RUN python3 -m pip install --upgrade pip setuptools
RUN pip install -r requirements.txt

COPY . ./

ARG UID
ARG GID
ARG USERNAME
ARG GROUPNAME
RUN groupadd -g ${GID} ${GROUPNAME} -f && \
    useradd -m -s /bin/bash -u ${UID} -g ${GID} ${USERNAME}
RUN mkdir -p staticfiles && chown ${USERNAME}:${GROUPNAME} staticfiles

USER ${USERNAME}

EXPOSE 8000