# Browserprüfungen

Im Projektordner unter macOS ausführen:

```sh
swift tests/browser.swift
```

Der Runner lädt die App in WebKit mit einem vorübergehenden Datenspeicher. Er prüft Geschichten und Rennen auf fünf Bildschirmgrößen. Für jeden Geschichtenlauf werden alle 48 Vorlagen mit jeweils 30 Zahlenvarianten geprüft; dazu kommen alternative Rechenwege, fehlerhafte Eingaben, Wiederholungswahl, Lernstände und Freischaltungen.

Die Update-Tests verwenden simulierte Service-Worker- und Netzwerkantworten. Sie prüfen Update-Erkennung, Offline- und Fehlerfälle, den Wechsel älterer Installationen, vollständige Asset-Caches und das gezielte Aktivieren. Sie ersetzen keinen Installationstest auf einem echten Gerät.

Vor einer Veröffentlichung auf einem installierten Gerät prüfen: App einmal online öffnen und schließen, anschließend erneut öffnen. Nach einer weiteren bereitgestellten Version „App aktualisieren“ wählen. Das bisherige Homebildschirm-Symbol und die gespeicherten Profile müssen erhalten bleiben. Danach die App offline starten und auch die Rechengeschichten öffnen.
