CREATE TYPE "public"."user_role" AS ENUM('SUPER_ADMIN', 'DEVELOPER', 'SOFTWARE_ENGINEER', 'SALES', 'RECEPTION');--> statement-breakpoint
CREATE TABLE "audit_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"user_name" text NOT NULL,
	"action" text NOT NULL,
	"details" text NOT NULL,
	"ip_address" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "consultation_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"consultation_type" text NOT NULL,
	"preferred_date" text NOT NULL,
	"preferred_time_slot" text NOT NULL,
	"full_name" text NOT NULL,
	"work_email" text NOT NULL,
	"company_name" text,
	"phone" text,
	"discussion_topics" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"message" text NOT NULL,
	"type" text NOT NULL,
	"read" boolean DEFAULT false NOT NULL,
	"reference_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "project_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"selected_services" jsonb NOT NULL,
	"timeline" text NOT NULL,
	"project_overview" text NOT NULL,
	"full_name" text NOT NULL,
	"work_email" text NOT NULL,
	"company_name" text,
	"phone" text,
	"request_nda" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"role" "user_role" DEFAULT 'SOFTWARE_ENGINEER' NOT NULL,
	"job_title" text,
	"status" text DEFAULT 'ACTIVE' NOT NULL,
	"last_login" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
