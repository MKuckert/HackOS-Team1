# HackOS-Team1

Thema: AR-Anwendung für die Hololens. Annäherung an ein Objekt im Raum, Einblendung von Text mit Informationen zum Objekt, "Herausfahren" eines Teilobjektes, Konstruktion eines Objektes.

## API

Die folgenden Veränderlichen sind enthalten:
- `$PART_ID`: ID eines Bauteils. Entspricht der ID des Bauteils im Unity-Projekt
- `$INSTRUCTION_ID`: ID der Anleitung, die abgerufen werden soll. Für unser Beispiel **immer** `hackos-team1`.
- `$MACHINE_ID`: ID der aufgebauten Maschine, z.B. generiert als GUID.
- `$USER`: Name des aufbauenden Konstrukteurs.

```json
GET /instructions/$INSTRUCTION_ID

{
    "instructions": [
        {
            "object_part": "$PART_ID",
            "textual_instruction": "..."
        },
        {
            "object_part": "$PART_ID",
            "textual_instruction": "..."
        },
        {
            "object_part": "$PART_ID",
            "textual_instruction": "..."
        },
        {
            "object_part": "$PART_ID",
            "textual_instruction": "..."
        }
    ]
}
```

```json
POST /documentation/machine/$MACHINE_ID

{
    "constructed_by": "$USER",
    "construction_order": [
        {
            "object_part": "$PART_ID"
        },
        {
            "object_part": "$PART_ID"
        },
        {
            "object_part": "$PART_ID"
        },
        {
            "object_part": "$PART_ID"
        }
    ]
}
```

```json
GET /documentation/machine/$MACHINE_ID

{
    "constructed_at": "YYYY-mm-dd HH:ii:ssZ",
    "constructed_by": "...",
    "construction_order": [
        {
            "object_part": "$PART_ID"
        },
        {
            "object_part": "$PART_ID"
        },
        {
            "object_part": "$PART_ID"
        },
        {
            "object_part": "$PART_ID"
        }
    ]
}
```

### HIGH STABLE API SERVER :) 

https://rbe.dev.bitnamic.net/api/