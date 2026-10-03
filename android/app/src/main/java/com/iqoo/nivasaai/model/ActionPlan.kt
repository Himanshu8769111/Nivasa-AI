package com.iqoo.nivasaai.model

data class ProposedDeviceChange(
    val deviceId: String,
    val deviceName: String,
    val roomName: String,
    val fromState: DeviceState,
    val toState: DeviceState,
    val fromMode: String? = null,
    val toMode: String? = null,
    val action: String
)

data class ImpactPreview(
    val energyDeltaKWh: Double,
    val costDeltaRs: Double,
    val devicesAffected: Int,
    val comfortImpact: String,
    val safetyImpact: String,
    val durationHours: Int
)

data class ActionPlan(
    val id: String,
    val title: String,
    val userPrompt: String?,
    val intent: String,
    val reasoning: String,
    val proposedChanges: List<ProposedDeviceChange>,
    val impactPreview: ImpactPreview,
    val timestamp: String
)
