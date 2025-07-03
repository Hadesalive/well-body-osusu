"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

interface AuditLog {
  id: number
  user: string
  action: string
  details: string
  timestamp: string
}

interface AuditLogFeedProps {
  data: AuditLog[]
}

export function AuditLogFeed({ data }: AuditLogFeedProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Audit Log</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.map((log) => (
          <div key={log.id} className="flex items-start space-x-4">
            <div>
              <p className="text-sm font-medium">{log.action}</p>
              <p className="text-sm text-muted-foreground">{log.details}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(log.timestamp).toLocaleString()} by {log.user}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
