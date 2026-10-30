# Browserprüfungen

Im Projektordner unter macOS ausführen:

```sh
swift tests/browser.swift
```

Der Runner lädt die App in WebKit mit einem vorübergehenden Datenspeicher. Er prüft Geschichten und Rennen auf fünf Bildschirmgrößen. Die Lernbedienung wird zusätzlich auf Handy- und iPad-Größen geprüft: direkte Reihenauswahl, Bündeln und Entbündeln durch Auswahl und Ziehen, ein fester Zahlenstrahl mit unverändertem Maßstab, vollständig freie Beschriftungen und Rechentastatur. Für jeden Geschichtenlauf werden alle 48 Vorlagen mit jeweils 30 Zahlenvarianten geprüft; dazu kommen alternative Rechenwege, fehlerhafte Eingaben, Wiederholungswahl, Lernstände und Freischaltungen.

Die Update-Tests verwenden simulierte Service-Worker- und Netzwerkantworten. Sie prüfen Update-Erkennung, Offline- und Fehlerfälle, den Wechsel älterer Installationen, vollständige Asset-Caches und das gezielte Aktivieren. Sie ersetzen keinen Installationstest auf einem echten Gerät.

Vor einer Veröffentlichung auf einem installierten Gerät prüfen: App einmal online öffnen und schließen, anschließend erneut öffnen. Nach einer weiteren bereitgestellten Version „App aktualisieren“ wählen. Das bisherige Homebildschirm-Symbol und die gespeicherten Profile müssen erhalten bleiben. Danach die App offline starten und auch die Rechengeschichten öffnen.

Die Minus-Prüfungen testen getrennte Lernstände bis 100, 1.000 und 10.000,
3.000 generierte Aufgaben pro Bildschirmgröße, den einfachen Einstieg,
Entbündeln, Kopfrechnen und die Hilfe nur für die aktuelle Aufgabe. Die
Profilprüfungen prüfen gemeinsame 50-Punkte-Level und den Erhalt bestehender
Freischaltungen. Die neuen Supabase-Rücksetzfunktionen müssen nach dem
SQL-Update zusätzlich mit einem echten Testprofil geprüft werden.

Die Häuser in der Minus-Werkstatt werden ausschließlich über den Lehrpersonenbereich
pro Profil und Zahlenraum ausgeblendet. Geprüft werden auch die dauerhaft sichtbare
Voreinstellung, das Speichern und Wiederherstellen der Einstellung sowie das erneute
Einschalten der Häuser.

Die Sammlungsprüfungen testen Levelweg, acht Kategorien, Tier- und Autoauswahl,
Sperren, Speicherung, getrennte Profile und die Streckenvorauswahl auf drei
Bildschirmgrößen. `collection.js` wird auch für die Offline-Nutzung gecacht.
