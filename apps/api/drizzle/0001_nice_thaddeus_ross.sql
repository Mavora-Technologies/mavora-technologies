CREATE TABLE "consultation_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"consultation_type" text,
	"preferred_date" text NOT NULL,
	"preferred_time_slot" text,
	"full_name" text NOT NULL,
	"work_email" text NOT NULL,
	"company_name" text,
	"phone" text,
	"discussion_topics" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "project_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"selected_services" jsonb NOT NULL,
	"timeline" text,
	"project_overview" text NOT NULL,
	"full_name" text NOT NULL,
	"work_email" text NOT NULL,
	"company_name" text,
	"phone" text,
	"request_nda" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
